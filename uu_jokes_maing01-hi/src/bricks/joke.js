//@@viewOn:imports
import * as UU5 from "uu5g04";
import "uu5g04-bricks";
import Config from "./config/config.js";
import JokeDetailsModal from "./joke-details-modal/joke-details-modal";

import "./joke.less";

//@@viewOff:imports

export const Joke = UU5.Common.VisualComponent.create({
  //@@viewOn:mixins
  mixins: [UU5.Common.BaseMixin],
  //@@viewOff:mixins

  //@@viewOn:statics
  statics: {
    tagName: Config.TAG + "Joke",
    classNames: {
      main: ""
    }
  },
  //@@viewOff:statics

  //@@viewOn:propTypes
  propTypes: {
    joke: UU5.PropTypes.object
  },
  //@@viewOff:propTypes

  //@@viewOn:getDefaultProps
  //@@viewOff:getDefaultProps

  //@@viewOn:reactLifeCycle
  //@@viewOff:reactLifeCycle

  //@@viewOn:interface
  //@@viewOff:interface

  //@@viewOn:overriding
  //@@viewOff:overriding

  //@@viewOn:private
  _openJokeDetails() {
    UU5.Environment.setRoute("jokeUpdate", { id: this.props.id });

    // UU5.Environment.getPage().getModal().open({
    //   header: <UU5.Bricks.Text content={this.props.name} className="uu5-common-singleline-ellipsis" />,
    //   content: <JokeDetailsModal joke={this.props} content="fake content"/>
    // })
  },
  //@@viewOff:private

  //@@viewOn:render
  render() {
    const { name, text } = this.props;

    return (
      <UU5.Bricks.Card
        {...this.getMainPropsToPass()}
        className="joke"
        header={<UU5.Bricks.Text content={name} className="uu5-common-singleline-ellipsis" />}
        footer={<UU5.Bricks.Button content="Open detail" onClick={this._openJokeDetails} />}
      >
        <UU5.Bricks.Div className="content">
          <UU5.Bricks.Text content={text} className="uu5-common-singleline-ellipsis" />
        </UU5.Bricks.Div>
      </UU5.Bricks.Card>
    );
  }
  //@@viewOff:render
});

export default Joke;
