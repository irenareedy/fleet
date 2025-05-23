import React from "react";

import Button from "components/buttons/Button";
import EmptyTable from "components/EmptyTable";
import CustomLink from "components/CustomLink";
import PATHS from "router/paths";
import GitOpsModeTooltipWrapper from "components/GitOpsModeTooltipWrapper";

interface IEmptyUsersTableProps {
  className: string;
  searchString: string;
  isGlobalAdmin: boolean;
  isTeamAdmin: boolean;
  toggleAddUserModal: () => void;
  toggleCreateMemberModal: () => void;
  disabled?: boolean;
}

const infoLink = (
  <>
    <CustomLink url={PATHS.ADMIN_USERS} text="Global users" /> can still access
    this team.
  </>
);

const CreateUserButton = ({
  className,
  isGlobalAdmin,
  isTeamAdmin,
  toggleAddUserModal,
  toggleCreateMemberModal,
  disabled = false,
}: Omit<IEmptyUsersTableProps, "searchString">) => {
  if (!isGlobalAdmin && !isTeamAdmin) {
    return null;
  }

  if (isGlobalAdmin) {
    return (
      <Button
        className={`${className}__create-button`}
        onClick={toggleAddUserModal}
        disabled={disabled}
      >
        Add user
      </Button>
    );
  }

  return (
    <Button
      className={`${className}__create-button`}
      onClick={toggleCreateMemberModal}
      disabled={disabled}
    >
      Create user
    </Button>
  );
};

const EmptyMembersTable = ({
  className,
  isGlobalAdmin,
  isTeamAdmin,
  searchString,
  toggleAddUserModal,
  toggleCreateMemberModal,
}: IEmptyUsersTableProps) => {
  if (searchString !== "") {
    return (
      <EmptyTable
        header="No users match the current criteria"
        info="Expecting to see users? Try again in a few seconds as the system catches up."
      />
    );
  }

  return (
    <EmptyTable
      graphicName="empty-users"
      header="No users on this team"
      info={infoLink}
      primaryButton={
        <GitOpsModeTooltipWrapper
          tipOffset={8}
          renderChildren={(disableChildren) => (
            <CreateUserButton
              className={className}
              isGlobalAdmin={isGlobalAdmin}
              isTeamAdmin={isTeamAdmin}
              toggleAddUserModal={toggleAddUserModal}
              toggleCreateMemberModal={toggleCreateMemberModal}
              disabled={disableChildren}
            />
          )}
        />
      }
    />
  );
};

export default EmptyMembersTable;
