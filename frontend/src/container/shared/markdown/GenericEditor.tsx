import converter from "container/shared/markdown/converter";
import client from "createApolloClient";
import { inject, observer } from "mobx-react";
import GET_USERS from "queries/getUsers";
import * as React from "react";
import ReactMde, { Suggestion } from "react-mde";
import UIStore from "stores/UIStore";
import IUser from "ts/interfaces/IUser";

interface Props {
  value?: string;
  onChange?: (newValue: string) => void;
  uiStore?: UIStore;
}

interface IUserData {
  users: IUser[];
}

// loadSuggestions retrieves a list of users from the server and formats
// the list into a format react-mde can use
function loadSuggestions(text: string): Promise<Suggestion[]> {
  return (
    client
      .query<IUserData>({ query: GET_USERS })
      .then(result => {
        // Get the list of all the users, from our GraphQL query
        const allUsers = result.data.users;

        // Format the list of users into a list of suggestions
        var formattedUsers = [];
        for (const user of allUsers) {
          formattedUsers.push({
            value: `@${user.username}`,
            preview: user.username
          });
        }

        // Return the suggestions where the user's username includes the typed in text
        // as a substring
        return formattedUsers.filter(user =>
          user.preview.toLowerCase().includes(text.toLowerCase())
        );
      })
      // If we couldn't get the list of users, provide no suggestions to the user
      .catch(error => [])
  );
}

function GenericEditor({ value, onChange, uiStore }: Props) {
  const [selectedTab, setSelectedTab] = React.useState<"write" | "preview">(
    "write"
  );

  return (
    <ReactMde
      minEditorHeight={125}
      minPreviewHeight={125}
      value={value}
      className={uiStore!.theme === "LIGHT" ? "" : "dark"}
      onChange={onChange}
      selectedTab={selectedTab}
      onTabChange={setSelectedTab}
      loadSuggestions={loadSuggestions}
      generateMarkdownPreview={markdown =>
        Promise.resolve(converter.makeHtml(markdown))
      }
    />
  );
}

export default inject("uiStore")(observer(GenericEditor));
