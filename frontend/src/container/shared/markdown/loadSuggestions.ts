import client from "createApolloClient";
import GET_USERS from "queries/getUsers";
import { Suggestion } from "react-mde";
import IUser from "ts/interfaces/IUser";

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

export default loadSuggestions;
