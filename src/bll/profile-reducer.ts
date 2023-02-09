const initialState = {
  posts: [
    { id: 1, postText: "Post1", likesCount: 11 },
    { id: 2, postText: "Post2", likesCount: 7 },
    { id: 3, postText: "Post3", likesCount: 16 },
    { id: 4, postText: "Post4", likesCount: 5 },
    { id: 5, postText: "Post5", likesCount: 10 },
  ] as PostType[],
};

export const profileReducer = (
  state = initialState,
  action: ProfileActionsType
): InitialStateType => {
  switch (action.type) {
    case "ADD-POST":
      return { ...state, posts: [action.post, ...state.posts] };
    default:
      return state;
  }
};

export const addPostAC = (post: PostType) => ({ type: "ADD-POST", post } as const);

type PostType = {
  id: number;
  postText: string;
  likesCount: number;
};
type InitialStateType = typeof initialState;
export type ProfileActionsType = ReturnType<typeof addPostAC>;
