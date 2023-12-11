export const parsePlaneStatus = (status: string) => {
  switch (status) {
    case 'ready_to_flight':
      return { value: 'Ready To Flight', color: 'green' };
    case 'broken':
      return { value: 'Broken', color: 'red' };
    default:
      return { value: status, color: 'purple' };
  }
};
