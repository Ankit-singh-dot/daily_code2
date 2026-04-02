interface PropType {
  placeHolder: string;
}
export function TextInput({ placeHolder }: PropType) {
  return (
    <input
      placeholder={placeHolder}
      style={{
        padding: 10,
        margin: 10, 
        borderColor: "black",
        borderWidth: 1,
      }}
    />
  );
}
