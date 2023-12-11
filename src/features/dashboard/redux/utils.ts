export const parsePlaneStatus = (status: string) => {
  switch (status) {
    case 'ready_to_flight':
      return 'Ready To Flight';
    case 'broken':
      return 'Broken';
    default:
      return status;
  }
};
