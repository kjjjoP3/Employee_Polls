import { render } from "@testing-library/react"
import { Provider } from "react-redux";
import { MemoryRouter } from "react-router-dom";
import store from "../reducers/store";
import { LeaderBoard } from "../components/LeaderBoard";

describe('leaderboard component', () => {
  it('will match to snapshot', () => {
    const component = render(<MemoryRouter><Provider store={store}><LeaderBoard/></Provider></MemoryRouter>);
    expect(component).toMatchSnapshot();
  })
})