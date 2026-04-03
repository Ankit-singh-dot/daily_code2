interface PropType {
  placeHolder: string;
  size: "big" | "small";
  onChange: any;
}
export function TextInput({ placeHolder, size, onChange }: PropType) {
  return (
    <input
      placeholder={placeHolder}
      onChange={onChange}
      style={{
        padding: size === "big" ? 20 : 10,
        margin: size === "big" ? 20 : 10,
        borderColor: "black",
        borderWidth: 1,
      }}
    />
  );
}
