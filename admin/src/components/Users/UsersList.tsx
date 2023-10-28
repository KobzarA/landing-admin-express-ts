import { IUser } from "../../../../shared/src/types/models";
import UsersListItem from "./UsersListItem";
import useModal from "../../hooks/useModal";
import { useState } from "react";
import UserEditForm from "./UserEditForm";
import { DeleteAction } from "../Modal/ModalMessages";
import { useDeleteUserMutation } from "../../api/usersApi";

enum ModalInfo {
  "EDIT" = "EDIT",
  "EDITED" = "EDITED",
  "EDIT_ERROR" = "EDIT_ERROR",
  "DELETE_CONFIRM" = "DELETE_CONFIRM",
  "DELETED" = "DELETED",
  "DELETE_ERROR" = "DELETE_ERROR",
  "PENDING" = "PENDING",
  "NOT_CREATED" = "NOT_CREATED",
}
const UsersList = ({ users }: { users: IUser[] }) => {
  const [modalInfo, setModalInfo] = useState<ModalInfo>(ModalInfo.NOT_CREATED);
  const [userMutate, setUserMutate] = useState<IUser | null>(null);
  const { ModalTemplate, isVisible, closeModal, openModal } = useModal();
  const [deleteUser /*result*/] = useDeleteUserMutation();

  const handleDeleteUser = (user: IUser) => {
    setModalInfo(ModalInfo.DELETE_CONFIRM);
    setUserMutate(user);
    openModal();
  };

  const handleEditUser = (user: IUser) => {
    setModalInfo(ModalInfo.EDIT);
    setUserMutate(user);
    openModal();
  };

  const list = users.map((user) => (
    <UsersListItem
      key={user.username}
      user={user}
      onDelete={() => handleDeleteUser(user)}
      onEdit={() => handleEditUser(user)}
    />
  ));

  const modal = () => {
    const modalProps = {
      closeModal,
      timeout: 3000,
    };
    switch (modalInfo) {
      case ModalInfo.EDIT:
        if (!userMutate) return null;
        return (
          <ModalTemplate closeModal={closeModal}>
            <UserEditForm user={userMutate} />
          </ModalTemplate>
        );
      case ModalInfo.EDITED:
        return <ModalTemplate {...modalProps}></ModalTemplate>;
      case ModalInfo.DELETE_CONFIRM:
        return (
          <ModalTemplate closeModal={closeModal}>
            <DeleteAction
              message={`Are you sure to delete ${userMutate?.username}`}
              closeModal={closeModal}
              action={() => {
                deleteUser(userMutate?.username);
              }}
            />
          </ModalTemplate>
        );
      case ModalInfo.DELETED:
        return <ModalTemplate {...modalProps}></ModalTemplate>;
      case ModalInfo.DELETE_ERROR:
        return <ModalTemplate {...modalProps}></ModalTemplate>;
      case ModalInfo.EDIT_ERROR:
        return <ModalTemplate {...modalProps}></ModalTemplate>;
      case ModalInfo.PENDING:
        return <ModalTemplate {...modalProps}></ModalTemplate>;
      case ModalInfo.NOT_CREATED:
        return null;
      default:
        return null;
    }
  };

  return (
    <>
      <ul className="mx-auto space-y-2 lg:max-w-[65%]">{list}</ul>
      {isVisible ? modal() : null}
    </>
  );
};

export default UsersList;
