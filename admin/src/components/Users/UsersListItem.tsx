import { IUser } from "../../interfaces/models";
interface IUsersListItem {
  user: IUser;
  onDelete: Function;
  onEdit: Function;
}

const UsersListItem = ({ user, onDelete, onEdit }: IUsersListItem) => {
  return (
    <li className="flex justify-between rounded-lg bg-slate-600 p-4">
      {/* User Info */}
      <div className="flex space-x-3">
        {/* Image wrapper
        <div>
          <img src="#" alt={user.username} />
        </div> */}
        {/* Name */}
        <div>{user.username}</div>
        {/* Role */}
        <div>{user.role}</div>
        {/* Email */}
        <div>{user.email}</div>
      </div>
      {/* Buttons flex */}
      <div className="flex space-x-3">
        <button onClick={() => onEdit()}>Edit</button>
        <button
          onClick={() => {
            if (user.email === "please@dont.delete")
              alert("I asked you to don`t do it :)");
            // onDelete()
          }}
        >
          Delete
        </button>
      </div>
    </li>
  );
};

export default UsersListItem;
