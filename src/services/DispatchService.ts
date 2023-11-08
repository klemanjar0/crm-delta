import { ToolkitStore } from '@reduxjs/toolkit/dist/configureStore';
import store, { AppDispatch, RootState } from '../store';
import { PayloadAction } from '@reduxjs/toolkit';

type GetStateFn = () => RootState;
type DispatchFn = AppDispatch;

class DispatchService {
  private readonly _getState: GetStateFn;
  private readonly _dispatch: DispatchFn;

  private constructor({ dispatch, getState }: { getState: GetStateFn; dispatch: DispatchFn }) {
    this._getState = getState;
    this._dispatch = dispatch;
  }

  public static fromStore(store: ToolkitStore): DispatchService {
    return new DispatchService({ dispatch: store.dispatch, getState: store.getState });
  }

  public getState(): RootState {
    return this._getState();
  }

  public dispatch<T = unknown>(action: PayloadAction<T>) {
    return this._dispatch(action);
  }
}

export default DispatchService.fromStore(store);
