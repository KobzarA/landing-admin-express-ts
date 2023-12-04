import UserCreateForm from "../Users/UserCreateForm";
import UserCreateForm2 from "../Users/UserCreateForm2";
import BackArrowButton from "../NavElements/BackArrowButton";

const UsersCreatePage = () => {
  return (
    <>
      <div>
        <BackArrowButton />
      </div>
      <div className=" mx-auto max-w-xl">
        {/* <UserCreateForm /> */}
        <UserCreateForm2 />
      </div>
    </>
  );
};

export default UsersCreatePage;
