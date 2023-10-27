import { IUser } from "../App";
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
        <button onClick={() => onDelete()}>Delete</button>
      </div>
    </li>
  );
};

export default UsersListItem;
