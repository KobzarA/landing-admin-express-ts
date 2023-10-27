export const ConfirmAction = ({
  message,
  closeModal,
  action,
}: {
  message: string;
  closeModal: Function;
  action: Function;
}) => {
  return (
    <div>
      <div>{message}</div>
      <div className="flex space-x-3">
        <button onClick={() => action()}>Confirm</button>
        <button onClick={() => closeModal()}>Cancel</button>
      </div>
    </div>
  );
};

export const DeleteAction = ({
  message,
  closeModal,
  action,
}: {
  message: string;
  closeModal: Function;
  action: Function;
}) => {
  return (
    <div>
      <div>{message}</div>
      <div className="flex space-x-3">
        <button onClick={() => action()}>Delete</button>
        <button onClick={() => closeModal()}>Cancel</button>
      </div>
    </div>
  );
};
