export const formatMessageTime = (dateData) => {
  const date = new Date(dateData);
  const hours = date.getHours();
  const minutes = date.getMinutes().toString().padStart(2, "0");
  return `${hours}:${minutes}`;
};
