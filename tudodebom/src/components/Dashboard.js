import MinhasAvaliacoes from "./MinhasAvaliacoes";

const Dashboard = (props) => {
    return (
        <div className='principal'>
            <MinhasAvaliacoes avaliacoes={props.avaliacoes} />
        </div>
    );
}

export default Dashboard;