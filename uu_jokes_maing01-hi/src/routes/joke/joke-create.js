//@@viewOn:imports
import * as UU5 from "uu5g04";
import "uu5g04-bricks";
import Config from "./config/config.js";
import Lsi from "./joke-create-lsi";

import Calls from "../../calls";

import JokeForm from "../../bricks/joke-form/joke-form";
import ContextProvider from "../../core/context-provider";
//@@viewOff:imports

export const JokeCreate = UU5.Common.VisualComponent.create({
  //@@viewOn:mixins
  mixins: [UU5.Common.BaseMixin, UU5.Common.RouteMixin],
  //@@viewOff:mixins

  //@@viewOn:statics
  statics: {
    tagName: Config.TAG + "JokeCreate",
    classNames: {
      main: (props, state) => Config.Css.css`padding: 8px; margin: 8px 0;`
    },
    lsi: Lsi
  },
  //@@viewOff:statics

  //@@viewOn:propTypes
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
  _handleOnSave({ component, values }, handleUpdate) {
    component.setPending();
    console.log("handelUpdate");
    handleUpdate(values);
},

  _handleOnCancel({ component, values }) {
    console.log("Cancel function");
  },

  _onUpdate(newData) {
    console.log("newData", newData);
    return new Promise((resolve, reject) => {
      Calls.createJoke({
        data: newData,
        done: dtoOut => {
          console.log('this._jokeForm', this._jokeForm);
          this._jokeForm.getForm().setReady();
          UU5.Environment.getPage().getAlertBus().setAlert({
            content: "joke created successfully",
            colorSchema: "success"
          });
          resolve(dtoOut)
        },
        fail: dtoOut => {
          this._jokeForm.getForm().setReady();
          UU5.Environment.getPage().getAlertBus().setAlert({
            content: "joke creation failed",
            colorSchema: "danger"
          });
          reject(dtoOut);
        }
      })
    });
  },
  //@@viewOff:private

  //@@viewOn:render
  render() {
    const initValues = {
      name: "just a joke",
      text: "deadly funny joke text",
      stars: 1,
      date: new Date(),
      hihimeter: "egegei"
    };

    return (
      <UU5.Bricks.Div {...this.getMainPropsToPass()}>
        <UU5.Bricks.LanguageSelector displayedLanguages={["en", "uk"]} />
        <UU5.Common.DataManager onUpdate={this._onUpdate} pessimistic>
          { ({ viewState, handleUpdate }) => {
            console.log("", viewState);
            return (
              <ContextProvider>
                <JokeForm
                  ref_={component => (this._jokeForm = component)}
                  onSave={(opt) => {this._handleOnSave(opt, handleUpdate)}}
                  onCancel={(opt) => {this._handleOnCancel(opt)}}
                />
              </ContextProvider>
            )
          } }
        </UU5.Common.DataManager>
      </UU5.Bricks.Div>
    );
  }
  //@@viewOff:render
});

export default JokeCreate;
