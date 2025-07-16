const UserCard = ({ user }) => {
  if (!user) return;
  const { photoUrl, firstName, lastName, age, gender, about } = user;

  return (
    user && (
      <div className="card bg-base-200 w-96 shadow-sm">
        <figure>
          <img src={photoUrl} alt="display" />
        </figure>
        <div className="card-body">
          <h2 className="card-title">{firstName + " " + lastName}</h2>
          {age && gender && <p>{age + ", " + gender}</p>}
          <p>{about}</p>
          <div className="card-actions justify-center my-4">
            <button className="btn btn-secondary">Interested</button>
            <button className="btn btn-primary">Ignore</button>
          </div>
        </div>
      </div>
    )
  );
};

export default UserCard;
