//@viewOn:imports
import * as UU5 from "uu5g04";

import Config from "../config/config.js";
import Context from "../../core/context";

import Lsi from "../../config/lsi";
//@viewOff:imports

export const JokeForm = UU5.Common.VisualComponent.create({
  //@@viewOn:mixins
  mixins: [UU5.Common.BaseMixin],
  //@@viewOff:mixins

  //@@viewOn:statics
  statics: {
    tagName: Config.TAG + "Bottom",
    classNames: {
      main: () => Config.Css.css`
        padding: 8px 0;
        border-top: 1px solid rgba(0, 0, 0, 0.12);
        color: gray;
      `
    },
    lsi: Lsi.jokeForm
  },

  //@@viewOff:statics

  //@@viewOn:propTypes
  propTypes : {
    onSave: UU5.PropTypes.func,
    onCancel: UU5.PropTypes.func,
    initValue: UU5.PropTypes.object,
  },
  //@@viewOff:propTypes

  //@@viewOn:getDefaultProps
  //@@viewOff:getDefaultProps

  //@@viewOn:reactLifeCycle
  //@@viewOff:reactLifeCycle

  //@@viewOn:interface
  getForm() {
    return this._form;
  },
  //@@viewOff:interface

  //@@viewOn:overriding
  //@@viewOff:overriding

  //@@viewOn:private
  _prepareComponentProps(name, data) {
    const { joke, feedbacks, messages, onChange, onChangeFeedback } = data;
    return {
      name,
      onChange,
      onChangeFeedback,
      value: joke[name],
      feedback: feedbacks[name],
      message: messages[name]
    };
  },
  //@@viewOff:private

  //@@viewOn:render
  render() {
    const { onSave, onCancel, initValue } = this.props;

    console.log("this.props", this.props);

    return (
      <Context.Consumer>
        { (data) => {
          // { joke, messages, feedbacks, onChange, onChangeFeedback }
          return (
            <UU5.Common.Div {...this.getMainPropsToPass()}>
              <UU5.Forms.Form
                ref_={opt => {this._form = opt}}
                labelColWidth="xs-12 s-12 m-3 l-2 xl-2"
                inputColWidth="xs-12 s-12 m-8 l-9 xl-9"
                onSave={onSave}
                onCancel={onCancel}
                values={initValue}
              >
                <UU5.Forms.Text
                  name="name"
                  label={this.getLsiComponent('nameLabel')}
                  placeholder={this.getLsiValue('namePlaceholder')}
                  required
                  size="s"
                />
                <UU5.Forms.TextArea
                  name="text"
                  label={this.getLsiComponent('textLabel')}
                  placeholder={this.getLsiValue('textPlaceholder')}
                  size="s"
                />
                <UU5.Forms.Controls />
              </UU5.Forms.Form>
            </UU5.Common.Div>
          )}
        }
      </Context.Consumer>
    );
  }
  //@@viewOff:render
});

export default JokeForm;
