import './App.css';
import { Routes, Route } from 'react-router-dom';
import { useReducer, useRef, createContext } from 'react';
import Home from './pages/Home';
import Diary from './pages/Diary';
import New from './pages/New';
import Edit from './pages/Edit';
import Notfound from './pages/Notfound';

const mockData = [
	{ id: 1, createDate: new Date().getTime(), emotionId: 1, content: '1번일기장' },
	{ id: 2, createDate: new Date().getTime(), emotionId: 2, content: '2번일기장' },
	{ id: 3, createDate: new Date().getTime(), emotionId: 3, content: '3번일기장' },
];
function reducer(state, action) {
	console.log(action);
	switch (action.type) {
		case 'CREATE':
			return [action.data, ...state];
		case 'UPDATE':
			return state.map(item => (String(item.id) === String(action.data.id) ? action.data : item));
		case 'delete':
			return state.filter(item => String(item.id) !== String(action.id));
	}
}

const DiaryStateContext = createContext();
const DiaryDispathContext = createContext();

function App() {
	const [data, dispath] = useReducer(reducer, mockData);
	const idRef = useRef(4);

	const onCreate = (createDate, emotionId, content) => {
		dispath({
			type: 'CREATE',
			data: {
				id: idRef.current++,
				createDate,
				emotionId,
				content,
			},
		});
	};

	const onUpdate = (id, createDate, emotionId, content) => {
		dispath({
			type: 'UPDATE',
			data: {
				id,
				createDate,
				emotionId,
				content,
			},
		});
	};
	const onDelete = id => {
		dispath({
			type: 'delete',
			id,
		});
	};
	return (
		<>
			<DiaryStateContext.Provider value={data}>
				<DiaryDispathContext.Provider value={{ onCreate, onUpdate, onDelete }}>
					<Routes>
						<Route path='/' element={<Home />} />
						<Route path='/new' element={<New />} />
						<Route path='/diary/:id' element={<Diary />} />
						<Route path='/edit/:id' element={<Edit />} />
						<Route path='*' element={<Notfound />} />
					</Routes>
				</DiaryDispathContext.Provider>
			</DiaryStateContext.Provider>
		</>
	);
}

export default App;
