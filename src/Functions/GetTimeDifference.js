
export const timeDifference =(timestamp) => {
    const now = new Date();
    const jobTime = new Date(timestamp);
    const timeDifference = now - jobTime;
    const seconds = Math.floor(timeDifference / 1000);

    if (seconds < 60) {
        return 'just now';
    } else if (seconds < 3600) {
        const minutes = Math.floor(seconds / 60);
        return `${minutes} min${minutes > 1 ? 's' : ''} ago`;
    } else if (seconds < 86400) {
        const hours = Math.floor(seconds / 3600);
        return `${hours} hour${hours > 1 ? 's' : ''} ago`;
    } else if (seconds < 604800) { // Less than 7 days
        const days = Math.floor(seconds / 86400);
        return `${days} day${days > 1 ? 's' : ''} ago`;
    } else if (seconds < 4838400) { // Less than 56 days (2 months)
        const weeks = Math.floor(seconds / 604800);
        return `${weeks} week${weeks > 1 ? 's' : ''} ago`;
    } else if (seconds < 29030400) { // Less than 11 months (approx. 335 days)
        const months = Math.floor(seconds / 2419200); // Assuming an average month length of 28 days
        return `${months} month${months > 1 ? 's' : ''} ago`;
    } else {
        // Return the exact date as a string
        const options = { year: 'numeric', month: 'long', day: 'numeric' };
        return jobTime.toLocaleDateString(undefined, options);
    }
}
