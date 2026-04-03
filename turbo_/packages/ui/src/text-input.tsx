interface PropType {
  placeHolder: string;
  size: "big" | "small";
  onChange: any;
  value: string;
}
export function TextInput({ placeHolder, size, onChange, value }: PropType) {
  return (
    <input
      placeholder={placeHolder}
      onChange={onChange}
      value={value}
      style={{
        padding: size === "big" ? 20 : 10,
        margin: size === "big" ? 20 : 10,
        borderColor: "black",
        borderWidth: 1,
      }}
    />
  );
}
