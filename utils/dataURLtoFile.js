export const base64ToFile = (base64String) => {
  const base64Data = base64String.replace(/^data:.+;base64,/, '');

  var binaryString = atob(base64Data);
  var bytes = new Uint8Array(binaryString.length);
  for (var i = 0; i < binaryString.length; i++) {
    bytes[i] = binaryString.charCodeAt(i);
  }
  return bytes.buffer;
};
