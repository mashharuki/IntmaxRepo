
export const displayAddress = (str: string) => {
  // 文字列が5文字未満の場合、そのまま返す
  if (str.length <= 5) {
    return str;
  }
  
  // 最初の5文字と最後の5文字を取得し、それらを "..." でつなげる
  const firstFive = str.substring(0, 5);
  const lastFive = str.substring(str.length - 5);
  return firstFive + "..." + lastFive;
}