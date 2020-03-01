import React from "react";
import "../styles/footer.css";
import Grid from "@material-ui/core/Grid";
import { withStyles } from "@material-ui/core/styles";

const styles = theme => {
  return {
    root: {
      flexGrow: 1
    }
  };
};

class Footer extends React.Component {
  render() {
    return (
      <footer className="ct-footer">
        <div className="ct-footer-list text-center-sm">
          <Grid
            container
            direction="row"
            justify="space-around"
            alignItems="stretch"
          >
            <Grid item xs={3} sm={3} className="gridXs">
              <h2 className="ct-footer-list-header">Debates</h2>
              <ul className="ulFooter">
                <li>
                  <a
                    className="anchorFooter"
                    href="http://debatimos.herokuapp.com/"
                  >
                    Página principal
                  </a>
                </li>
                <li>
                  <a
                    className="anchorFooter"
                    href="http://debatimos.herokuapp.com/"
                  >
                    Categorias
                  </a>
                </li>
                <li>
                  <a
                    className="anchorFooter"
                    href="http://debatimos.herokuapp.com/"
                  >
                    Favoritos
                  </a>
                </li>
                <li>
                  <a
                    className="anchorFooter"
                    href="http://debatimos.herokuapp.com/"
                  >
                    Crear Tema
                  </a>
                </li>
              </ul>
            </Grid>
            <Grid item xs={3} sm={3} className="gridXs">
              <li>
                <h2 className="ct-footer-list-header">Sobre nosotros</h2>
                <ul className="ulFooter">
                  <li>
                    <a
                      className="anchorFooter"
                      href="http://debatimos.herokuapp.com/"
                    >
                      Quiénes somos
                    </a>
                  </li>
                  <li>
                    <a
                      className="anchorFooter"
                      href="http://debatimos.herokuapp.com/"
                    >
                      Reglas
                    </a>
                  </li>
                  <li>
                    <a
                      className="anchorFooter"
                      href="http://debatimos.herokuapp.com/"
                    >
                      Blog
                    </a>
                  </li>
                  <li>
                    <a
                      className="anchorFooter"
                      href="http://debatimos.herokuapp.com/"
                    >
                      Contactanos
                    </a>
                  </li>
                </ul>
              </li>
            </Grid>
            <Grid item xs={3} sm={3} className="gridXs">
              <li>
                <h2 className="ct-footer-list-header">Categorias</h2>
                <ul className="ulFooter">
                  <li>
                    <a
                      className="anchorFooter"
                      href="http://debatimos.herokuapp.com/"
                    >
                      Economía
                    </a>
                  </li>
                  <li>
                    <a
                      className="anchorFooter"
                      href="http://debatimos.herokuapp.com/"
                    >
                      Tecnología
                    </a>
                  </li>
                  <li>
                    <a
                      className="anchorFooter"
                      href="http://debatimos.herokuapp.com/"
                    >
                      Política
                    </a>
                  </li>
                  <li>
                    <a
                      className="anchorFooter"
                      href="http://debatimos.herokuapp.com/"
                    >
                      Estilo de vida
                    </a>
                  </li>

                  <li>
                    <a
                      className="anchorFooter"
                      href="http://debatimos.herokuapp.com/"
                    >
                      Tecnología
                    </a>
                  </li>
                  <li>
                    <a
                      className="anchorFooter"
                      href="http://debatimos.herokuapp.com/"
                    >
                      Y mucho más...
                    </a>
                  </li>
                </ul>
              </li>{" "}
            </Grid>
          </Grid>
        </div>

        <div>
          <div>
            <div className="inner-right">
              <p className="copyright">
                Copyright © 2020 Debatimos <span> </span>
                <a href="http://debatimos.herokuapp.com/">
                  Política de privacidad
                </a>
              </p>
              <p className="resena">
                Una página diseñada para reflexionar y ser más crítico con las
                opiniones
              </p>
            </div>
          </div>
        </div>
      </footer>
    );
  }
}

export default withStyles(styles)(Footer);
