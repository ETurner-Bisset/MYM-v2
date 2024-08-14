export const formatDate = (date) => {
  const formatedDate = new Date(date).toLocaleDateString('en-US', {
    weekday: 'short',
    day: 'numeric',
    month: 'short',
  });

  const day = formatedDate.split(' ')[2];

  let abr = 'th';

  if (day === '1') {
    abr = 'st';
  } else if (day === '2') {
    abr = 'nd';
  } else if (day === '3') {
    abr = 'rd';
  }

  const finishedDate = `${formatedDate}${abr}`;
  return finishedDate;
};
