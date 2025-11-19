import { useEffect, useState } from "react";
import Footer from "@components/Footer/Footer";
import Navbar from "@components/Navbar/Navbar";
import DataTable from "react-data-table-component";
import { getAllUsers, createUser, updateUser } from "@api/usuario";
import { getSetorDto } from "@api/setor";
import "./Usuario.css";

export default function Usuario() {
    const [usuarios, setUsuarios] = useState([]);
    const [setores, setSetores] = useState([]);

    const [filterText, setFilterText] = useState("");

    // Estados para criar usuário
    const [novoNome, setNovoNome] = useState("");
    const [novoEmail, setNovoEmail] = useState("");
    const [novoSetor, setNovoSetor] = useState("0");
    const [novoAdmin, setNovoAdmin] = useState(false);

    // Estados do usuário sendo editado
    const [editId, setEditId] = useState(null);
    const [editNome, setEditNome] = useState("");
    const [editEmail, setEditEmail] = useState("");
    const [editSetor, setEditSetor] = useState("0");
    const [editAdmin, setEditAdmin] = useState(false);

    // Carrega usuários + setores ao abrir a página
    useEffect(() => {
        carregarUsuarios();
        carregarSetores();
    }, []);

    function carregarUsuarios() {
        getAllUsers()
            .then(setUsuarios)
            .catch(console.error);
    }

    function carregarSetores() {
        getSetorDto()
            .then(setSetores)
            .catch(console.error);
    }

    /** 🔵 Abrir modal de edição */
    function abrirModalEditar(usuario) {
        setEditId(usuario.id);
        setEditNome(usuario.nome);
        setEditEmail(usuario.email);
        setEditSetor(usuario.setor_Id);
        setEditAdmin(usuario.role === "admin");

        $("#atualizar-usuario").modal("show");
    }

    /** 🟢 Criar usuário */
    async function handleCreateUser(e) {
        e.preventDefault();

        const payload = {
            nome: novoNome,
            email: novoEmail,
            setor_Id: Number(novoSetor),
            role: novoAdmin ? "admin" : "user"
        };

        await createUser(payload);

        $("#cadastrar-usuario").modal("hide");

        carregarUsuarios();
    }

    /** 🟠 Editar usuário */
    async function handleEditUser(e) {
        e.preventDefault();

        const payload = {
            nome: editNome,
            email: editEmail,
            setor_Id: Number(editSetor),
            role: editAdmin ? "admin" : "user"
        };

        await updateUser(editId, payload);

        $("#atualizar-usuario").modal("hide");

        carregarUsuarios();
    }

    /** 📌 Definição das colunas */
    const columns = [
        { name: "ID", selector: (row) => row.id, sortable: true },
        { name: "Nome", selector: (row) => row.nome, sortable: true },
        { name: "Email", selector: (row) => row.email },
        { name: "Setor", selector: (row) => row.setor },
        {
            name: "Ações",
            cell: (row) => (
                <button
                    className="btn btn-outline-secondary"
                    onClick={() => abrirModalEditar(row)}
                >
                    <i className="bi bi-pencil-square"></i>
                </button>
            ),
        },
    ];

    const filteredItems = usuarios.filter((u) =>
        u.nome.toLowerCase().includes(filterText.toLowerCase())
    );

    return (
        <div className="full-width-container">
            <Navbar />

            <h4 className="text-center mt-3">Usuários</h4>

            <div className="util-area">
                <button
                    className="btn btn-primary"
                    data-toggle="modal"
                    data-target="#cadastrar-usuario"
                >
                    <i className="bi bi-person-add"></i> Criar novo usuário
                </button>

                <input
                    className="search form-control"
                    type="text"
                    placeholder="Pesquisar..."
                    value={filterText}
                    onChange={(e) => setFilterText(e.target.value)}
                    style={{ width: "250px" }}
                />
            </div>

            <div className="content">
                <DataTable
                    columns={columns}
                    data={filteredItems}
                    pagination
                    highlightOnHover
                    striped
                    noDataComponent="Nenhum registro encontrado"
                    paginationComponentOptions={{
                        rowsPerPageText: "Linhas por página",
                        rangeSeparatorText: "de",
                        selectAllRowsItem: true,
                        selectAllRowsItemText: "Todos",
                    }}
                />
            </div>

            {/* MODAL CADASTRAR */}
            <div className="modal fade" id="cadastrar-usuario">
                <div className="modal-dialog modal-dialog-centered">
                    <div className="modal-content">

                        <div className="modal-header">
                            <h4 className="modal-title">Criar novo usuário</h4>
                            <button type="button" className="close" data-dismiss="modal">&times;</button>
                        </div>

                        <form className="form" onSubmit={handleCreateUser}>
                            <div className="modal-body">

                                <div className="form-group">
                                    <label>Nome:</label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        value={novoNome}
                                        onChange={(e) => setNovoNome(e.target.value)}
                                        required
                                    />
                                </div>

                                <div className="form-group">
                                    <label>Email:</label>
                                    <input
                                        type="email"
                                        className="form-control"
                                        value={novoEmail}
                                        onChange={(e) => setNovoEmail(e.target.value)}
                                        required
                                    />
                                </div>

                                <div className="form-group">
                                    <label>Setor:</label>
                                    <select
                                        className="form-control"
                                        value={novoSetor}
                                        onChange={(e) => setNovoSetor(e.target.value)}
                                        required
                                    >
                                        <option value="0">Selecione um setor</option>

                                        {setores.map((s) => (
                                            <option key={s.id} value={s.id}>{s.nome}</option>
                                        ))}
                                    </select>
                                </div>

                                <div className="form-group form-check">
                                    <label className="form-check-label">
                                        <input
                                            type="checkbox"
                                            className="form-check-input"
                                            checked={novoAdmin}
                                            onChange={(e) => setNovoAdmin(e.target.checked)}
                                        />
                                        Administrador
                                    </label>
                                </div>

                            </div>

                            <div className="modal-footer">
                                <button type="button" className="btn btn-secondary" data-dismiss="modal">Fechar</button>
                                <button type="submit" className="btn btn-primary">Salvar</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>

            {/* MODAL EDITAR */}
            <div className="modal fade" id="atualizar-usuario">
                <div className="modal-dialog modal-dialog-centered">
                    <div className="modal-content">

                        <div className="modal-header">
                            <h4 className="modal-title">Editar usuário</h4>
                            <button type="button" className="close" data-dismiss="modal">&times;</button>
                        </div>

                        <form className="form" onSubmit={handleEditUser}>
                            <div className="modal-body">

                                <div className="form-group">
                                    <label>Nome:</label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        value={editNome}
                                        onChange={(e) => setEditNome(e.target.value)}
                                        required
                                    />
                                </div>

                                <div className="form-group">
                                    <label>Email:</label>
                                    <input
                                        type="email"
                                        className="form-control"
                                        value={editEmail}
                                        onChange={(e) => setEditEmail(e.target.value)}
                                        required
                                    />
                                </div>

                                <div className="form-group">
                                    <label>Setor:</label>
                                    <select
                                        className="form-control"
                                        value={editSetor}
                                        onChange={(e) => setEditSetor(e.target.value)}
                                    >
                                        <option value="0">Selecione um setor</option>

                                        {setores.map((s) => (
                                            <option key={s.id} value={s.id}>{s.nome}</option>
                                        ))}
                                    </select>
                                </div>

                                <div className="form-group form-check">
                                    <label className="form-check-label">
                                        <input
                                            type="checkbox"
                                            className="form-check-input"
                                            checked={editAdmin}
                                            onChange={(e) => setEditAdmin(e.target.checked)}
                                        />
                                        Administrador
                                    </label>
                                </div>

                            </div>

                            <div className="modal-footer">
                                <button type="button" className="btn btn-secondary" data-dismiss="modal">Fechar</button>
                                <button type="submit" className="btn btn-primary">Atualizar</button>
                            </div>
                        </form>

                    </div>
                </div>
            </div>

            <Footer />
        </div>
    );
}
