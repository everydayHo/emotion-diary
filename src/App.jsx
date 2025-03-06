import './App.css';
import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Diary from './pages/Diary';
import New from './pages/New';
import Notfound from './pages/Notfound';
import Button from './components/Button';
import Header from './components/Header';
// import getEmotionImage from './util/get-emotion-images';

function App() {
	return (
		<>
			<Header title={'Header'} leftChild={<Button text={'left'} />} rightChild={<Button text={'right'} />} />
			<Button
				text={'123'}
				onClick={() => {
					console.log('버튼');
				}}
				type={'NEGATIVE'}
			/>
			<Routes>
				<Route path='/' element={<Home />} />
				<Route path='/new' element={<New />} />
				<Route path='/diary/:id' element={<Diary />} />
				<Route path='*' element={<Notfound />} />
			</Routes>
		</>
	);
}

export default App;
