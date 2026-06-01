import React from 'react';
import { Carousel } from 'antd';
import { Link } from 'react-router-dom';

const Carrossel = (props) => {
    const receitas = props.receitas.filter((r) => r.nota_media != null);
    const top5Receitas = [...receitas]
        .sort((a, b) => b.nota_media - a.nota_media)
        .slice(0, 5);

    return (
        <>
            <Carousel autoplay={{ dotDuration: true }} arrows infinite={false}>
                {top5Receitas.map((receita) => (
                    <div key={receita.id}>
                        <Link to={`/receitas/${receita.id}`} style={{ display: 'block' }}>
                            <div className='carrossel'>
                                <img
                                    src={receita.imagem}
                                    alt={receita.nome}
                                    className='carrossel-img'
                                />
                                <div className='texto-carrossel'>
                                    <h3 style={{ margin: 0, fontSize: '24px', fontWeight: 'bold', color: '#fff' }}>
                                        {receita.nome}
                                    </h3>
                                    <span style={{ fontSize: '18px', marginTop: '8px' }}>
                                        ⭐ {receita.nota_media}
                                    </span>
                                </div>
                            </div>
                        </Link>
                    </div>
                ))}
            </Carousel>
            <br />
        </>
    );
};

export default Carrossel;