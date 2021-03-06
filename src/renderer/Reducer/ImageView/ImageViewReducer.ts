import ImageViewState from "../../State/ImageViewState/ImageViewState";
import {
  ImageViewActionType,
  ImageViewAction
} from "../../Actions/ImageView/ImageViewAction";
import { ipcRenderer } from "electron";
import { WindowEvent } from "../../../events/Window";

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
      // index + 1 が length 以上なら0に戻す
      const nextIndex =
        state.index + 1 >= state.files.length ? 0 : state.index + 1;
      return {
        ...state,
        index: nextIndex
      };
    }
    case ImageViewActionType.DECREMENT_INDEX: {
      // index - 1 が 0未満なら末尾にする
      const nextIndex =
        state.index - 1 < 0 ? state.files.length - 1 : state.index - 1;
      return {
        ...state,
        index: nextIndex
      };
    }

    case ImageViewActionType.SAVE_STATE: {
      ipcRenderer.send(WindowEvent.saveApplicationState, state);
      return state;
    }

    case ImageViewActionType.LOAD_STATE: {
      const stateValue: ImageViewState = ipcRenderer.sendSync(
        WindowEvent.loadApplicationStateRequest
      );
      if (stateValue) {
        return stateValue;
      } else {
        return state;
      }
    }
    default:
      return state;
  }
}
