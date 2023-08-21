import { ModalProperties } from "../utils/types";

export enum ModalActionTypes {
    ShowModal,
    HideModal,
  }
  export interface ModalAction {
    type: ModalActionTypes;
    payload?: ModalProperties;
  }
  
  export function hideModal(): ModalAction {
    return {
      type: ModalActionTypes.HideModal,
    };
  }

  export function showModal(payload: ModalProperties): ModalAction {
    return {
      type: ModalActionTypes.ShowModal,
      payload,
    };
  }