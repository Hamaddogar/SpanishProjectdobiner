import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import FormHelperText from "@material-ui/core/FormHelperText";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";

const useStyles = makeStyles(theme => ({
  formControl: {
    margin: "20px 0 10px 0",
    minWidth: 150
  },
  selectEmpty: {
    marginTop: theme.spacing(2)
  },
  error: {
    color: "red",
    margin: 0
  }
}));

export default function SimpleSelect(props) {
  const classes = useStyles();

  const inputLabel = React.useRef(null);
  const [labelWidth, setLabelWidth] = React.useState(0);
  React.useEffect(() => {
    setLabelWidth(inputLabel.current.offsetWidth);
  }, []);
  const { options, input, handleChange, topic } = props;

  return (
    <div>
      <FormControl variant="outlined" className={classes.formControl}>
        <InputLabel ref={inputLabel} id="demo-simple-select-outlined-label">
          Categorias
        </InputLabel>
        <Select
          error={input.category}
          id="demo-simple-select-outlined"
          value={topic.categoryLabel}
          onChange={handleChange}
          labelWidth={labelWidth}
        >
          <MenuItem value="">
            <em>Elige Categoria</em>
          </MenuItem>
          {options.map((category, index) => (
            <MenuItem key={index} value={category.label}>
              {category.label}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
      {input.category ? (
        <FormHelperText className={classes.error}>
          Selecciona una categoría
        </FormHelperText>
      ) : (
        ""
      )}
    </div>
  );
}
