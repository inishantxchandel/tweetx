import React from 'react'

const PostList = ({feedData}) => {
  
  function timeToTimeAgo(timestamp) {
    const currentDate = new Date();
    const postDate = new Date(timestamp);
    const timeDifference = currentDate - postDate;
    
    const seconds = Math.floor(timeDifference / 1000);
    const minutes = Math.floor(seconds / 60);
    const hours = Math.floor(minutes / 60);
    const days = Math.floor(hours / 24);
    const weeks = Math.floor(days / 7);
    const months = Math.floor(days / 30);
    const years = Math.floor(days / 365);
  
    if (seconds < 60) {
      return `${seconds} second${seconds !== 1 ? 's' : ''} ago`;
    } else if (minutes < 60) {
      return `${minutes} minute${minutes !== 1 ? 's' : ''} ago`;
    } else if (hours < 24) {
      return `${hours} hour${hours !== 1 ? 's' : ''} ago`;
    } else if (days < 7) {
      return `${days} day${days !== 1 ? 's' : ''} ago`;
    } else if (weeks < 4) {
      return `${weeks} week${weeks !== 1 ? 's' : ''} ago`;
    } else if (months < 12) {
      return `${months} month${months !== 1 ? 's' : ''} ago`;
    } else {
      return `${years} year${years !== 1 ? 's' : ''} ago`;
    }
  }
  return (
    <div>
       <div className="flex flex-col gap-6 mt-6">
        {feedData.map((feed) => (
          <div className="flex flex-col sm:flex-row shadow-xl  rounded-md py-4 px-4 md:px-8 relative overflow-hidden">
            <div className="size-10 sm:size-12 rounded-full bg-rose-400 absolute right-0 top-1/2 -translate-y-1/2 overflow-hidden translate-x-5"></div>
            <div>
              <img
                src={feed.authorImg}
                onError={(e) => (e.target.src = "/defaultImg.png")}
                className="size-12 md:size-16 mr-4 rounded-full border object-cover border-gray-600"
                alt="author-img"
              />
            </div>
            <div className="flex flex-col md:mt-4">
              <h4 className="text-lg font-medium text-gray-600">
                {feed.authorName}
              </h4>
              <p className="text-gray-400 absolute right-20 top-12">
                {timeToTimeAgo(feed.createdAt)}
              </p>
              <p className="text-gray-400 max-w-md mt-4">{feed.text}</p>
            </div>
          </div>
        ))}
        
      </div>
    </div>
  )
}

export default PostList