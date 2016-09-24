'use strict';

require('./usuarios-content.scss');

// -----------------------------------------------------------------------------------------------
// React + Other Modules
// -----------------------------------------------------------------------------------------------

var React = require('react');
var Parse = require('parse');
var UsuariosActions = require('src/actions/usuarios-actions');

var AltaUsuario = require('./alta-usuario');

// -----------------------------------------------------------------------------------------------
// UsuariosContent
// -----------------------------------------------------------------------------------------------

var UsuariosContent = React.createClass({
    getInitialState: function () {
        return {savingUser: false};
    },
    render: function () {
        return (
            <div className='usuarios-content'>
                <h2>Usuarios</h2>
                {this.renderButton()}
                {this.renderContent()}
            </div>
        );
    },
    renderButton: function () {
        if (this.state.savingUser) {
            return (<button type='button' className='top-left' onClick={this.toggleAddingUser}>Regresar</button>);
        }

        return (<button type='button' className='top-right' onClick={this.toggleAddingUser}>Agregar usuario</button>);
    },
    renderContent: function () {
        if (this.state.savingUser) {
            return (<AltaUsuario usuario={this.state.usuario} />);
        }

        return (
            <ul className='usuarios-list'>
                {this.getUsuarios()}
            </ul>
        );
    },
    toggleAddingUser: function () {
        var state = {};
        if (this.state.savingUser) {
            state.usuario = null;
        }

        state.savingUser = !this.state.savingUser;

        this.setState(state);
    },
    getUsuarios: function () {
        var usuarios = this.props.usuarios;
        if (usuarios.size === 0) {
            return;
        }

        var usuariosArray = [];
        var self = this;
        var currentUserId = Parse.User.current().id;
        usuarios.forEach(function (usuario) {
            if (usuario.id === currentUserId) {
                return;
            }

            usuariosArray.push(
                <li>
                    <span className='name'>{usuario.nombre + ' ' + usuario.apellido}</span>
                    <div className='buttons-wrapper'>
                        <button type='button' onClick={self.editUser.bind(self, usuario)}>Editar</button>
                        <button type='button' onClick={self.deleteUser.bind(self, usuario)}>Eliminar</button>
                    </div>
                </li>
            );
        });

        return usuariosArray;
    },
    editUser: function (usuario) {
        this.setState({savingUser: true, usuario: usuario});
    },
    deleteUser: function (usuario) {
        UsuariosActions.deleteUsuario(usuario.id);
    }
});

module.exports = UsuariosContent;
