import ImageViewState from "../../State/ImageViewState/ImageViewState";
import {
  ImageViewActionType,
  ImageViewAction
} from "../../Actions/ImageView/ImageViewAction";

const initialState = {
  files: [],
  index: -1
};

export default function ImageViewReducer(
  state: ImageViewState = initialState,
  action: ImageViewAction
): ImageViewState {
  switch (action.type) {
    case ImageViewActionType.CHANGEFILES: {
      return {
        ...state,
        // フォルダが変わったらindexを0に戻す
        index: 0,
        files: action.files
      };
    }
    case ImageViewActionType.INCREMENT_INDEX: {
      // index + 1 が length 以上ならインクリメントしない
      const nextIndex =
        state.index + 1 > state.files.length ? state.index : state.index + 1;
      return {
        ...state,
        index: nextIndex
      };
    }
    case ImageViewActionType.DECREMENT_INDEX: {
      // index - 1 が 0未満ならデクリメントしない
      const nextIndex = state.index - 1 < 0 ? 0 : state.index - 1;
      return {
        ...state,
        index: nextIndex
      };
    }
    default:
      return state;
  }
}