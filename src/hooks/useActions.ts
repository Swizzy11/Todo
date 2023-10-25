import { useDispatch } from "react-redux";
import { bindActionCreators } from "redux";
import ActionCreators  from "../store/action-creator";

export const useActions = () => {
    const dipsatch = useDispatch()
                   
    return bindActionCreators(ActionCreators, dipsatch)
}
