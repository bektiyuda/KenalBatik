import NavbarAdmin from "../Components/NavbarAdmin";

function Dashboard() {
    return (
        <section>
            <NavbarAdmin />
            <div>
                <div className="flex justify-between">
                    <input type="text"  placeholder="cari"/>
                    <button>Tambh Entri</button>
                </div>
            </div>
        </section>
    );
}

export default Dashboard;
