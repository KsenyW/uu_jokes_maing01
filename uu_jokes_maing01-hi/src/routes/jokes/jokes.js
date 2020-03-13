//@viewOn:imports
import * as UU5 from "uu5g04";

import Calls from "../../calls";
import Config from "../config/config.js";
import Lsi from "./jokes-lsi";

import Joke from "../../bricks/joke";
//@viewOff:imports

export const Jokes = UU5.Common.VisualComponent.create({
  //@@viewOn:mixins
  mixins: [UU5.Common.BaseMixin,UU5.Common.RouteMixin],
  //@@viewOff:mixins

  //@@viewOn:statics
  statics: {
    tagName: Config.TAG + "Bottom",
    classNames: {
      main: () => Config.Css.css`
        padding: 8px 0;
        text-align: center;
        border-top: 1px solid rgba(0, 0, 0, 0.12);
        color: gray;
      `
    },
    lsi: Lsi
  },
  //@@viewOff:statics

  //@@viewOn:propTypes
  //@@viewOff:propTypes

  //@@viewOn:getDefaultProps
  //@@viewOff:getDefaultProps

  //@@viewOn:reactLifeCycle
  componentDidMount() {
    // UU5.Environment.getRouter().preventPageLeave();
  },
  //@@viewOff:reactLifeCycle

  //@@viewOn:interface
  //@@viewOff:interface

  //@@viewOn:overriding
  //@@viewOff:overriding

  //@@viewOn:private
  _jokesList(list) {
    return list.map((item) => {
      return <Joke joke={{ ...item }} key={item.id}/>
    })
  },

  _showAlert() {
    UU5.Environment.getPage().getAlertBus().setAlert({
      content: "Yahoooo!",
      colorSchema: "warning"
    });
  },

  _showContext(button, e) {
    this._menu.open({
      event: e
    });
  },

  _openCreateJokeRoute() {
    UU5.Environment.setRoute("jokeCreate")
  },

  _allowPageLeave(){
    UU5.Environment.getRouter().allowPageLeave();
  },

  _onLoad(dtoIn) {
    return new Promise((resolve, reject) => {
      Calls.getJokes({
        data: dtoIn,
        done: dtoOut =>
          resolve({
            itemList: dtoOut.itemList,
            pageInfo: dtoOut.pageInfo
          }),
        fail: response => reject(response)
      });
    });
  },
  //@@viewOff:private

  //@@viewOn:render
  render() {
    return (
      <UU5.Common.Div {...this.getMainPropsToPass()}>
        <UU5.Common.ListDataManager
          onLoad={this._onLoad}
        >
          {({ viewState, errorState, errorData, data }) => {
            if (errorState) {
              // error
              return <UU5.Common.Error data={errorData} />;
            } else if (data) {
              // ready
              return (
                <UU5.Common.Fragment>
                  <UU5.Bricks.Header
                    content={this.getLsiComponent("jokesListHeader")}
                    tooltip={this.getLsiValue("jokesListHeader")}
                    level={3}
                  />
                  <UU5.Bricks.Button
                    colorSchema="green"
                    onClick={this._openCreateJokeRoute}
                  >
                    <UU5.Bricks.Icon icon="mdi-plus" />
                    Create joke
                  </UU5.Bricks.Button>
                  <UU5.Bricks.Resize>
                    <UU5.Tiles.List
                      tile={<Joke/>}
                      data={data}
                      tileHeight={300}
                      tileMinWidth={220}
                      tileMaxWidth={400}
                      tileSpacing={8}
                      tileElevationHover={1}
                      tileBorder
                      tileStyle={{ borderRadius: 4 }}
                      rowSpacing={8}
                      tileJustify="space-between"
                      scrollElement={window}
                    />
                  </UU5.Bricks.Resize>
                </UU5.Common.Fragment>
              )
            } else {
              // loading
              return <UU5.Bricks.Loading />;
            }
          }}
        </UU5.Common.ListDataManager>

      </UU5.Common.Div>
    );
  }
  //@@viewOff:render
});

export default Jokes;
