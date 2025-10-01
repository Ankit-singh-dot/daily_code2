import time
import pytesseract
import cv2
import numpy as np
from PIL import Image, ImageEnhance, ImageFilter
from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.chrome.service import Service
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
from selenium.webdriver.common.action_chains import ActionChains
from selenium.common.exceptions import TimeoutException, NoSuchElementException
from webdriver_manager.chrome import ChromeDriverManager
import os

class UdyamVerifier:
    def __init__(self):
        # Configure tesseract path (adjust based on your installation)
        # For Windows: r'C:\Program Files\Tesseract-OCR\tesseract.exe'
        # For Mac: '/usr/local/bin/tesseract' or '/opt/homebrew/bin/tesseract'
        # For Linux: usually in PATH
        pytesseract.pytesseract.tesseract_cmd = "/usr/local/bin/tesseract"
        
        self.driver = None
        self.wait = None
        
    def setup_driver(self):
        """Setup Chrome driver with optimal settings"""
        options = webdriver.ChromeOptions()
        options.add_argument("--start-maximized")
        options.add_argument("--disable-blink-features=AutomationControlled")
        options.add_experimental_option("excludeSwitches", ["enable-automation"])
        options.add_experimental_option('useAutomationExtension', False)
        
        self.driver = webdriver.Chrome(
            service=Service(ChromeDriverManager().install()), 
            options=options
        )
        self.driver.execute_script("Object.defineProperty(navigator, 'webdriver', {get: () => undefined})")
        self.wait = WebDriverWait(self.driver, 20)
        
    def preprocess_captcha_image(self, image_path):
        """Enhanced image preprocessing for better OCR accuracy"""
        # Read image
        img = cv2.imread(image_path)
        
        # Convert to grayscale
        gray = cv2.cvtColor(img, cv2.COLOR_BGR2GRAY)
        
        # Apply Gaussian blur to reduce noise
        blurred = cv2.GaussianBlur(gray, (5, 5), 0)
        
        # Apply threshold to get binary image
        _, thresh = cv2.threshold(blurred, 0, 255, cv2.THRESH_BINARY + cv2.THRESH_OTSU)
        
        # Morphological operations to clean up
        kernel = np.ones((2,2), np.uint8)
        cleaned = cv2.morphologyEx(thresh, cv2.MORPH_CLOSE, kernel)
        
        # Resize image for better OCR
        height, width = cleaned.shape
        cleaned = cv2.resize(cleaned, (width*3, height*3), interpolation=cv2.INTER_CUBIC)
        
        # Save processed image
        processed_path = 'captcha_processed.png'
        cv2.imwrite(processed_path, cleaned)
        
        return processed_path
        
    def extract_captcha_text(self, image_path):
        """Extract text from captcha using OCR with multiple attempts"""
        processed_image = self.preprocess_captcha_image(image_path)
        
        # Configure tesseract for alphanumeric characters
        custom_config = r'--oem 3 --psm 8 -c tessedit_char_whitelist=ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789'
        
        try:
            # Try OCR on processed image
            captcha_text = pytesseract.image_to_string(
                Image.open(processed_image), 
                config=custom_config
            ).strip()
            
            # Clean up the text
            captcha_text = ''.join(c for c in captcha_text if c.isalnum())
            
            print(f"🤖 Extracted CAPTCHA: '{captcha_text}'")
            return captcha_text
            
        except Exception as e:
            print(f"❌ OCR Error: {e}")
            return ""
        finally:
            # Clean up temporary files
            if os.path.exists(processed_image):
                os.remove(processed_image)
                
    def navigate_to_verify_page(self):
        """Navigate to the Udyam verification page"""
        try:
            # Step 1: Open homepage
            print("📍 Opening Udyam registration homepage...")
            self.driver.get("https://udyamregistration.gov.in/Government-India/Ministry-MSME-registration.htm")
            time.sleep(3)
            
            # Step 2: Try direct navigation to verify page
            print("📍 Navigating directly to verify page...")
            self.driver.get("https://udyamregistration.gov.in/Udyam_Verify.aspx")
            time.sleep(3)
            
            return True
            
        except Exception as e:
            print(f"❌ Navigation error: {e}")
            return False
            
    def find_form_elements(self):
        """Find form elements with multiple locator strategies"""
        udyam_input = None
        captcha_input = None
        verify_button = None
        
        # Try multiple selectors for Udyam number input
        udyam_selectors = [
            (By.ID, "ctl00_ContentPlaceHolder1_txtUdyamno"),
            (By.NAME, "ctl00$ContentPlaceHolder1$txtUdyamno"),
            (By.XPATH, "//input[contains(@placeholder, 'UDYAM')]"),
            (By.XPATH, "//input[@type='text' and contains(@id, 'Udyam')]"),
            (By.CSS_SELECTOR, "input[placeholder*='UDYAM']")
        ]
        
        for selector_type, selector in udyam_selectors:
            try:
                udyam_input = self.wait.until(EC.presence_of_element_located((selector_type, selector)))
                print(f"✅ Found Udyam input using: {selector}")
                break
            except TimeoutException:
                continue
                
        # Try multiple selectors for captcha input
        captcha_selectors = [
            (By.ID, "ctl00_ContentPlaceHolder1_txtCaptcha"),
            (By.NAME, "ctl00$ContentPlaceHolder1$txtCaptcha"),
            (By.XPATH, "//input[@placeholder='Verification Code']"),
            (By.XPATH, "//input[contains(@id, 'Captcha')]")
        ]
        
        for selector_type, selector in captcha_selectors:
            try:
                captcha_input = self.driver.find_element(selector_type, selector)
                print(f"✅ Found captcha input using: {selector}")
                break
            except NoSuchElementException:
                continue
                
        # Try multiple selectors for verify button
        button_selectors = [
            (By.ID, "ctl00_ContentPlaceHolder1_btnVerify"),
            (By.NAME, "ctl00$ContentPlaceHolder1$btnVerify"),
            (By.XPATH, "//input[@value='Verify' or @value='VERIFY']"),
            (By.CSS_SELECTOR, "input[value*='erify']")
        ]
        
        for selector_type, selector in button_selectors:
            try:
                verify_button = self.driver.find_element(selector_type, selector)
                print(f"✅ Found verify button using: {selector}")
                break
            except NoSuchElementException:
                continue
                
        return udyam_input, captcha_input, verify_button
        
    def get_captcha_image(self):
        """Get and save captcha image with multiple attempts"""
        captcha_selectors = [
            (By.ID, "ctl00_ContentPlaceHolder1_CaptchaImage"),
            (By.XPATH, "//img[contains(@src, 'Captcha')]"),
            (By.CSS_SELECTOR, "img[src*='captcha']"),
            (By.XPATH, "//img[contains(@id, 'Captcha')]")
        ]
        
        for selector_type, selector in captcha_selectors:
            try:
                captcha_img = self.driver.find_element(selector_type, selector)
                captcha_img.screenshot("captcha.png")
                print(f"✅ Captcha image saved using: {selector}")
                return True
            except NoSuchElementException:
                continue
                
        print("❌ Could not find captcha image")
        return False
        
    def verify_udyam_number(self, udyam_number, max_attempts=3):
        """Main function to verify Udyam number with retry logic"""
        if not self.navigate_to_verify_page():
            return False
            
        for attempt in range(max_attempts):
            print(f"\n🔄 Attempt {attempt + 1}/{max_attempts}")
            
            try:
                # Find form elements
                udyam_input, captcha_input, verify_button = self.find_form_elements()
                
                if not all([udyam_input, captcha_input, verify_button]):
                    print("❌ Could not find all required form elements")
                    if attempt < max_attempts - 1:
                        print("🔄 Refreshing page...")
                        self.driver.refresh()
                        time.sleep(3)
                        continue
                    return False
                
                # Clear and enter Udyam number
                udyam_input.clear()
                udyam_input.send_keys(udyam_number)
                print(f"✅ Entered Udyam number: {udyam_number}")
                
                # Get captcha image
                if not self.get_captcha_image():
                    if attempt < max_attempts - 1:
                        continue
                    return False
                
                # Extract captcha text
                captcha_text = self.extract_captcha_text("captcha.png")
                
                if not captcha_text or len(captcha_text) < 4:
                    print("❌ Could not extract valid captcha text")
                    if attempt < max_attempts - 1:
                        # Refresh captcha by clicking refresh button if available
                        try:
                            refresh_btn = self.driver.find_element(By.XPATH, "//a[contains(@onclick, 'Captcha')]")
                            refresh_btn.click()
                            time.sleep(2)
                        except:
                            self.driver.refresh()
                            time.sleep(3)
                        continue
                    return False
                
                # Enter captcha
                captcha_input.clear()
                captcha_input.send_keys(captcha_text)
                print(f"✅ Entered captcha: {captcha_text}")
                
                # Click verify button
                verify_button.click()
                print("✅ Clicked verify button")
                
                # Wait for response
                time.sleep(5)
                
                # Check for success or error
                try:
                    # Look for success indicators
                    success_indicators = [
                        "//div[contains(text(), 'Enterprise Name')]",
                        "//table[contains(@class, 'table')]",
                        "//span[contains(text(), 'Valid')]"
                    ]
                    
                    for indicator in success_indicators:
                        if self.driver.find_elements(By.XPATH, indicator):
                            print("🎉 Verification successful!")
                            return True
                            
                    # Look for error messages
                    error_indicators = [
                        "//span[contains(text(), 'Invalid')]",
                        "//div[contains(@class, 'error')]",
                        "//span[contains(text(), 'incorrect')]"
                    ]
                    
                    error_found = False
                    for indicator in error_indicators:
                        error_elements = self.driver.find_elements(By.XPATH, indicator)
                        if error_elements:
                            print(f"❌ Error: {error_elements[0].text}")
                            error_found = True
                            break
                    
                    if not error_found:
                        print("⚠️ Unclear response, attempting to continue...")
                        return True
                        
                except Exception as e:
                    print(f"⚠️ Could not determine result: {e}")
                
                if attempt < max_attempts - 1:
                    print("🔄 Retrying...")
                    self.driver.refresh()
                    time.sleep(3)
                    
            except Exception as e:
                print(f"❌ Attempt {attempt + 1} failed: {e}")
                if attempt < max_attempts - 1:
                    time.sleep(2)
                    
        return False
        
    def cleanup(self):
        """Clean up resources"""
        if self.driver:
            self.driver.quit()
        
        # Clean up image files
        for file in ['captcha.png', 'captcha_processed.png']:
            if os.path.exists(file):
                os.remove(file)

# Usage example
if __name__ == "__main__":
    verifier = UdyamVerifier()
    
    try:
        verifier.setup_driver()
        
        # Your Udyam number
        UDYAM_NUMBER = "UDYAM-KR-07-0015634"
        
        print(f"🚀 Starting verification for: {UDYAM_NUMBER}")
        success = verifier.verify_udyam_number(UDYAM_NUMBER)
        
        if success:
            print("✅ Verification completed successfully!")
            print("📋 Check the browser for verification results")
            input("Press Enter to close...")
        else:
            print("❌ Verification failed after all attempts")
            
    except Exception as e:
        print(f"❌ Fatal error: {e}")
        
    finally:
        verifier.cleanup()