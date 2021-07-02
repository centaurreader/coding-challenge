export const eventToHumanReadableLabel = (event: string) => {
  switch (event) {
    case 'issue_closed':
      return 'Closed';
    case 'issue_reported':
      return 'Reported';
    case 'issue_acked':
      return 'Acknowledged';
    case 'arrived':
      return 'Arrived';
    case 'departed':
      return 'Departed';
    default: {
      return '';
    }
  }
};

export default {
  eventToHumanReadableLabel,
};
