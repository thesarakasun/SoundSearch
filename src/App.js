import './App.css';
import Footer from './components/Footer';
import Header from './components/Header';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Container, InputGroup, FormControl, Button, Row, Card } from 'react-bootstrap';
import { useState, useEffect } from 'react';

const CLIENT_ID = "";
const CLIENT_SECRET = "";

function App() {
    const [searchInput, setSearchInput] = useState("");
    const [accessToken, setAccessToken] = useState("");
    const [tracks, setTracks] = useState([]);

    useEffect(() => {
        const authParameters = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            body: `grant_type=client_credentials&client_id=${CLIENT_ID}&client_secret=${CLIENT_SECRET}`
        };

        fetch('https://accounts.spotify.com/api/token', authParameters)
            .then(result => result.json())
            .then(data => setAccessToken(data.access_token))
            .catch(error => console.error('Error fetching access token:', error));
    }, []);

    async function search() {
        console.log("Searching for songs: ", searchInput);

        if (!searchInput) {
            alert("Please enter a song name.");
            return;
        }

        const songParameters = {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${accessToken}`
            }
        };

        try {
            const response = await fetch(`https://api.spotify.com/v1/search?q=${encodeURIComponent(searchInput)}&type=track&limit=10`, songParameters);
            const data = await response.json();

            if (data.tracks && data.tracks.items.length > 0) {
                setTracks(data.tracks.items);
            } else {
                alert("No songs found.");
            }
        } catch (error) {
            console.error("Error fetching data:", error);
        }
    }

    return (
        <div className="App">
          <Header/>
            <Container>
                <InputGroup className="mb-3" size="lg">
                    <FormControl
                        placeholder="Search for a Song/Artist"
                        type="input"
                        value={searchInput}
                        onChange={(event) => setSearchInput(event.target.value)}
                        onKeyDown={(event) => {
                            if (event.key === "Enter") {
                                search();
                            }
                        }}
                    />
                    <Button onClick={search}>Search</Button>
                </InputGroup>
            </Container>

            <Container>
                <Row className="mx-2 row row-cols-3">
                    {tracks.length > 0 ? (
                        tracks.map((track, index) => (
                            <Card key={index} className="mb-4">
                                <Card.Img src={track.album.images[0]?.url || 'https://via.placeholder.com/150'} alt={track.name} />
                                <Card.Body>
                                    <Card.Title>{track.name}</Card.Title>
                                    <Card.Text>{track.artists[0].name}</Card.Text>
                                    
                                </Card.Body>
                            </Card>
                        ))
                    ) : (
                        <p>No songs found. </p>
                    )}
                </Row>
            </Container>
            <Footer/>
        </div>
    );
}

export default App;