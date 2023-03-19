import { useEffect, useState } from 'react';
import { buscarPokemon } from '../service/pokemon';
import TextField from '@mui/material/TextField';
import ThreeSixtyIcon from '@mui/icons-material/ThreeSixty';
import CircularProgress from '@mui/material/CircularProgress';
import ErrorIcon from '@mui/icons-material/Error';

import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { Button, CardActionArea, CardActions } from '@mui/material';
import Chip from '@mui/material/Chip';
import ElectricBoltIcon from '@mui/icons-material/ElectricBolt';
import WaterIcon from '@mui/icons-material/Water';
import GrassIcon from '@mui/icons-material/Grass';
import LocalFireDepartmentIcon from '@mui/icons-material/LocalFireDepartment';
import SportsBaseballIcon from '@mui/icons-material/SportsBaseball';
import ControlCameraIcon from '@mui/icons-material/ControlCamera';
import AdjustIcon from '@mui/icons-material/Adjust';
import Grid from '@mui/material/Unstable_Grid2';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Pokebola from '../assets/pokebola.png'
import './Home.css';

const Home = () => {
    const [pokemon, setPokemon] = useState({});
    const [pesquisa, setPesquisa] = useState("");
    const [rotate, setRotate] = useState(true);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(false);

    useEffect(() => {
        //buscar()
    }, [1]);

    const buscar = () => {
        setLoading(true);
        setError(false);
        buscarPokemon(pesquisa.toLocaleLowerCase())
            .then((res) => {
                console.log(res)
                setPokemon(res)
                setLoading(false);
                setRotate(true)
            })
            .catch(() => {
                setPokemon({})
                setLoading(false);
                setError(true);
            });
    };

    const Item = styled(Paper)(({ theme }) => ({
        backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
        ...theme.typography.body2,
        padding: theme.spacing(1),
        textAlign: 'center',
        color: theme.palette.text.secondary,
    }));

    const getChip = (e, i) => {
        const tipo = e.type.name

        if (tipo && tipo == 'electric') {
            return <Chip key={i} className='tip' color='warning' icon={<ElectricBoltIcon />} label={e.type.name} />
        }
        else if (tipo && tipo == 'water') {
            return <Chip key={i} className='tip' color='primary' icon={<WaterIcon />} label={e.type.name} />
        }
        else if (tipo && tipo == 'grass') {
            return <Chip key={i} className='tip' color='success' icon={<GrassIcon />} label={e.type.name} />
        }
        else if (tipo && tipo == 'fire') {
            return <Chip key={i} className='tip' color='error' icon={<LocalFireDepartmentIcon />} label={e.type.name} />
        }
        else if (tipo) {
            return <Chip key={i} className='tip' color='info' icon={<SportsBaseballIcon />} label={e.type.name} />
        }
        else if (error || !pokemon.sprites) {
            <></>
        }
    }
    return (
        <div className="background">
            <div className="pokedex-container">
                <div className="pokedex-header">
                    <div className="pokemon-image">
                        {loading ? (
                            <CircularProgress />
                        ) : error ? (
                            <>
                                <div className="pokedex-image-container">
                                    <Card sx={{ maxWidth: 150 }}>
                                        <CardMedia
                                            component="img"
                                            height="150"
                                            width="150"
                                            image={Pokebola}
                                            alt={''}
                                        />
                                    </Card>
                                </div>
                                <b>Sem Registro</b>
                            </>
                        ) : (
                            <>
                                <div className="pokedex-image-container">
                                    <Card sx={{ maxWidth: 345 }}>
                                        <CardMedia
                                            component="img"
                                            height="150"
                                            width="150"
                                            image={rotate ? pokemon.sprites ? pokemon.sprites.front_default : Pokebola : pokemon.sprites ? pokemon.sprites.back_default : Pokebola}
                                            alt={pokemon.name}
                                            onClick={() => setRotate(!rotate)}
                                        />
                                    </Card>
                                </div>
                                <b>{pokemon.name ? pokemon.name.toUpperCase() : "Sem Registro"}</b>
                            </>
                        )}
                    </div>
                    <div className='pesquisa-container'>
                        <TextField
                            id="outlined-controlled"
                            className='pesquisa'
                            label="Pesquisar"
                            value={pesquisa}
                            onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                                setPesquisa(event.target.value);
                            }}
                        />
                        <div className='tips'>
                            {pokemon.types ? pokemon.types.map((e, i) => {
                                return getChip(e, i)
                            })
                                : <></>
                            }
                        </div>
                    </div>
                    <Button
                        className='botao-pesquisa'
                        color='error'
                        onClick={buscar}
                        sx={{ borderRadius: '20px' }}
                    >
                        Buscar
                    </Button>
                </div>
                <div>
                    <h2>Status</h2>
                    <Grid container spacing={3} rowSpacing={1}>
                        {pokemon.stats ? pokemon.stats.map((e, i) => {
                            return (
                                <Grid display="flex" justifyContent="center" alignItems="center">
                                    <p><b>{e.stat.name.toUpperCase() + ': '}</b>    {e.base_stat}</p>
                                    </Grid>)
                        }) : <><p> - - -</p></>}
                    </Grid>
                </div>
                <div>
                    <h2>Habilidades</h2>
                    {pokemon.abilities ? pokemon.abilities.map((e, i) => {
                        return <Chip key={i} className='tip' color='primary' icon={<ControlCameraIcon />} label={e.ability.name} />
                    }) : <><p> - - -</p></>}
                </div>
                <div>
                    <h2>Movimentos</h2>
                    {pokemon.moves ? pokemon.moves.map((e, i) => {
                        return <Chip key={i} className='tip' color='secondary' icon={<AdjustIcon />} label={e.move.name} />
                    }) : <><p> - - -</p></>}
                </div>
            </div>
        </div>
    );
};

export default Home;
