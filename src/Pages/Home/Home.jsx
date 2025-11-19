import { useEffect, useState } from "react";
import Footer from "../../Components/Footer/Footer";
import { getAllItems } from "../../api/item";
import DataTable from "react-data-table-component";
import Navbar from "../../Components/Navbar/Navbar";

export default function Home() {
  const [items, setItems] = useState([]);
  const [filterText, setFilterText] = useState("");

  // Carrega itens da API
  useEffect(() => {
    getAllItems()
      .then(setItems)
      .catch(console.error);
  }, []);

  // Definição das colunas (JS normal)
  const columns = [
    {
      name: "Número",
      selector: (row) => row.numero,
      sortable: true,
    },
    {
      name: "Categoria",
      selector: (row) => row.categoria,
      sortable: true,
    },
    {
      name: "Subitem",
      selector: (row) => row.subitem,
    },
    {
      name: "Conteúdo obrigatório",
      selector: (row) => row.conteudoObrigatorio,
    },
    {
      name: "Periodicidade",
      selector: (row) => row.periodicidade,
    },
    {
      name: "Status",
      selector: (row) => row.status,
      sortable: true,
    },
    {
      name: "Setor",
      selector: (row) => row.setor,
      sortable: true,
    },
    {
      name: "Ações",
      cell: (row) => (
        <div className="d-flex gap-3">
          <button
            className="btn btn-outline-secondary"
            aria-label="Editar"
            title="Editar"
            onClick={() => alert(`Editar ${row.id}`)}
          >
            <i className="bi bi-pencil-square"></i>
          </button>
        </div>
      ),
    },
  ];

  // Filtro de pesquisa
  const filteredItems = items.filter((item) =>
    item.numero?.toString().includes(filterText) ||
    item.subitem?.toLowerCase().includes(filterText.toLowerCase()) ||
    item.conteudoObrigatorio?.toLowerCase().includes(filterText.toLowerCase()) ||
    item.periodicidade?.toLowerCase().includes(filterText.toLowerCase()) ||
    item.formaDivulgacao?.toLowerCase().includes(filterText.toLowerCase()) ||
    item.categoria?.toLowerCase().includes(filterText.toLowerCase()) ||
    item.status?.toLowerCase().includes(filterText.toLowerCase()) ||
    item.setor?.toLowerCase().includes(filterText.toLowerCase())
  );

  return (
    <div className="full-width-container">
    <Navbar />
      <div className="area-title">
        <h4 className="text-center mt-3">Matriz de Responsabilidade</h4>

        <input
          className="search form-control"
          type="text"
          placeholder="Pesquisar..."
          value={filterText}
          onChange={(e) => setFilterText(e.target.value)}
          style={{
            marginBottom: "10px",
            padding: "5px",
            width: "250px",
          }}
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

      <Footer />
    </div>
  );
}
