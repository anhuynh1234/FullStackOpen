import { useState, forwardRef, useImperativeHandle } from "react";
import PropTypes from "prop-types";

const Togglable = forwardRef((props, refs) => {
  const [visible, setVisible] = useState(false);

  const hideWhenVisible = { display: visible ? "none" : "" };
  const showWhenVisible = { display: visible ? "" : "none" };

  const toggle = () => {
    setVisible(!visible);
  };

  useImperativeHandle(refs, () => {
    return {
      toggle,
    };
  });

  return (
    <div>
      <div style={hideWhenVisible}>
        <button
          id={props.buttonLabel.toLowerCase()}
          onClick={() => {
            setVisible(!visible);
          }}
        >
          {props.buttonLabel}
        </button>
      </div>
      <div style={showWhenVisible}>
        {props.children}
        <button
          onClick={() => {
            setVisible(!visible);
          }}
        >
          Cancel
        </button>
      </div>
    </div>
  );
});

Togglable.propTypes = {
  buttonLabel: PropTypes.string.isRequired,
};

Togglable.displayName = "Togglable";

export default Togglable;
