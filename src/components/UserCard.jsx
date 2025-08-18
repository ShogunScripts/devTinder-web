const getResizedImage = (url, width, height) => {
  if (!url.includes("/upload/")) return url; 
  return url.replace(
    "/upload/",
    `/upload/w_${width},h_${height},c_fill/`
  );
};

const UserCard = ({user}) => {
    const {firstName, lastName, age, gender, profileURL, about, skills} = user
    const resizedURL = getResizedImage(profileURL, 300, 400);
    
    return(
        <div className="card card-side bg-neutral shadow-sm w-[600px] h-[400px]">
            <figure className="w-[300px] h-[400px] overflow-hidden">
                <img
                    src={resizedURL}
                    alt="UserPhoto"
                    className="object-cover w-full h-full"
                />
            </figure>
            <div className="card-body w-[300px] h-[400px] flex flex-col justify-between">
                <div className="card-body flex flex-col">
                    <h2 className="card-title truncate">
                        {firstName + " " + lastName}
                    </h2>
                    <p className="text-sm line-clamp-3">{about}</p>
                    {age && gender && <p>{age+", "+gender}</p>}
                    <p>{"Skills : "+skills}</p>
                    <div className="card-actions justify-center mt-auto mb-2 space-x-2">
                        <button className="btn btn-soft btn-primary">Accept</button>
                        <button className="btn btn-soft btn-secondary">Deny</button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default UserCard