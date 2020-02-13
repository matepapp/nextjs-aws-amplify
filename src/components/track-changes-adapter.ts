const appData = {
  // Users data.
  users: [
    {
      id: "user-1",
      name: "Joe Doe",
      // Note that the avatar is optional.
      avatar: "https://randomuser.me/api/portraits/thumb/men/26.jpg"
    },
    {
      id: "user-2",
      name: "Ella Harper",
      avatar: "https://randomuser.me/api/portraits/thumb/women/65.jpg"
    }
  ]
};

export class TrackChangesAdapter {
  editor: any;

  constructor(editor) {
    this.editor = editor;
  }

  init() {
    const usersPlugin = this.editor.plugins.get("Users");
    const trackChangesPlugin = this.editor.plugins.get("TrackChanges");
    const commentsPlugin = this.editor.plugins.get("Comments");

    // Load the users data.
    for (const user of appData.users) {
      usersPlugin.addUser(user);
    }

    // Set the current user.
    usersPlugin.defineMe("user-1");

    // Set the adapter to the `TrackChanges#adapter` property.
    trackChangesPlugin.adapter = {
      getSuggestion: suggestionId => {
        // This function should query the database for data for a suggestion with a `suggestionId`.
        console.log("Get suggestion", suggestionId);

        return new Promise(resolve => {
          switch (suggestionId) {
            case "suggestion-1":
              resolve({
                id: "suggestion-1",
                type: "insertion",
                authorId: "user-2",
                createdAt: new Date(2019, 1, 13, 11, 20, 48),
                hasComments: true
              });

              break;
            case "suggestion-2":
              resolve({
                id: "suggestion-2",
                type: "deletion",
                authorId: "user-1",
                createdAt: new Date(2019, 1, 14, 12, 7, 20),
                hasComments: false
              });

              break;
            case "suggestion-3":
              resolve({
                id: "suggestion-3",
                type: "insertion",
                authorId: "user-1",
                createdAt: new Date(2019, 1, 14, 12, 7, 20),
                hasComments: false
              });

              break;
            case "suggestion-4":
              resolve({
                id: "suggestion-4",
                type: "deletion",
                authorId: "user-1",
                createdAt: new Date(2019, 1, 15, 8, 44, 1),
                hasComments: true
              });

              break;
            case "suggestion-5":
              resolve({
                id: "suggestion-5",
                type: "formatInline:886cqig6g8rf",
                authorId: "user-2",
                hasComments: false,
                createdAt: new Date(2019, 2, 8, 10, 2, 7),
                data: {
                  commandName: "bold",
                  commandParams: [{ forceValue: true }]
                }
              });

              break;
            case "suggestion-6":
              resolve({
                id: "suggestion-6",
                type: "formatBlock:698dn3otqzd6",
                authorId: "user-2",
                hasComments: false,
                createdAt: new Date(2019, 2, 8, 10, 2, 10),
                data: {
                  commandName: "heading",
                  commandParams: [{ value: "heading2" }],
                  formatGroupId: "blockName",
                  multipleBlocks: false
                }
              });

              break;
          }
        });
      },

      addSuggestion: suggestionData => {
        // This function should save `suggestionData` in the database.
        console.log("Suggestion added", suggestionData);

        return Promise.resolve({
          createdAt: new Date() // Should be set server-side.
        });
      },

      updateSuggestion: (id, suggestionData) => {
        // This function should update `suggestionData` in the database.
        console.log("Suggestion updated", id, suggestionData);

        return Promise.resolve();
      }
    };

    // Track changes uses comments to allow discussing about the suggestions.
    // The comments adapter has to be defined as well.
    commentsPlugin.adapter = {
      getCommentThread: commentThreadId => {
        // This function should query the database for data for the comment thread with a `commentThreadId`.
        console.log("Get comment thread", commentThreadId);
        return new Promise(resolve => {
          switch (commentThreadId) {
            case "suggestion-1":
              resolve({
                threadId: "suggestion-1",
                comments: [
                  {
                    commentId: "comment-1",
                    content: "Sounds good.",
                    authorId: "user-1",
                    createdAt: new Date(2019, 1, 13, 11, 32, 57)
                  }
                ]
              });
              break;
            case "suggestion-4":
              resolve({
                threadId: "suggestion-4",
                comments: [
                  {
                    commentId: "comment-2",
                    content: "I think it's not relevant.",
                    authorId: "user-2",
                    createdAt: new Date(2019, 1, 15, 9, 3, 1)
                  },
                  {
                    commentId: "comment-3",
                    content: "You are right. Thanks.",
                    authorId: "user-1",
                    createdAt: new Date(2019, 1, 15, 9, 28, 1)
                  }
                ]
              });
              break;
            default:
              resolve();
          }
        });
      },
      addComment: data => {
        // This function should save `data` in the database.
        console.log("Comment added", data);
        return Promise.resolve({
          createdAt: new Date() // Should be set server-side.
        });
      },
      updateComment: data => {
        // This function should save `data` in the database.
        console.log("Comment updated", data);
        return Promise.resolve();
      },
      removeComment: data => {
        // This function should remove the comment of a given `data` from the database.
        console.log("Comment removed", data);
        return Promise.resolve();
      }
    };
  }
}
