'use strict';

var React = require('react');
var Flux = require('flux/utils');

var UsuariosActions = require('src/actions/usuarios-actions');
var UsuariosStore = require('src/stores/usuarios-store');

var UsuariosContent = require('./usuarios-content');

class Usuarios extends React.Component {
    static getStores () {
        return [UsuariosStore];
    }

    static calculateState (prevState, props) {
        var usuarios = UsuariosStore.get('usuarios');

        return {
            loading: usuarios.size === 0 && UsuariosStore.get('fetching'),
            error: usuarios.size === 0 ? UsuariosStore.get('fetchError') : null,
            usuarios: usuarios
        };
    }

    componentWillMount () {
        UsuariosActions.fetchUsuarios();
    }

    render () {
        return (
            <main className='usuarios'>
                {this.renderContent()}
            </main>
        );
    }

    renderContent () {
        if (this.state.loading) {
            return (<h2>Cargando...</h2>);
        } else if (this.state.error) {
            return (<div className='error'>Hubo un error. Favor de intentar de nuevo.</div>);
        } else {
            return (<UsuariosContent usuarios={this.state.usuarios} />);
        }
    }
}

module.exports = Flux.Container.create(Usuarios, {withProps: true});
