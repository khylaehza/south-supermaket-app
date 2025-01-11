import { useState, useContext, useEffect, createContext } from 'react';

import axios from 'axios';

const DataContext = createContext();

export const useData = () => {
	return useContext(DataContext);
};
const DataProvider = ({ children }) => {
	const url = 'https://bmcforreserve.com/public/php_scripts';
	const [cart, setCart] = useState([]);
	const [curUser, setCurUser] = useState({});
	const [products, setProducts] = useState([{}]);
	const [approvalUrl, setApprovalUrl] = useState(null);
	const [refreshing, setRefreshing] = useState(true);
	const [announcement, setAnnouncement] = useState([]);
	const [users, setUsers] = useState([]);

	useEffect(() => {
		fetchUsers();

		const interval = setInterval(() => {
			fetchUsers();
		}, 30000);

		return () => clearInterval(interval);
	}, []);

	useEffect(() => {
		const currentUserToUpdate = users.find(
			(user) => user.username === curUser.username
		);

		if (currentUserToUpdate) {
			setCurUser(currentUserToUpdate);
		}
	}, [users, curUser]);

	const fetchUsers = async () => {
		try {
			const response = await axios.get(`${url}/get_users.php`);
			setUsers(response.data);
		} catch (error) {
			console.log('error');
		}
	};

	useEffect(() => {
		const intervalId = setInterval(() => {
			const updatedCart = Object.fromEntries(
				Object.entries(cart).filter(
					([key, item]) => item.quantity !== 0
				)
			);

			setCart(updatedCart);
		}, 50000);

		return () => clearInterval(intervalId);
	}, [cart, setCart]);

	useEffect(() => {
		const fetchData = async () => {
			try {
				const response = await axios.get(`${url}/get_products.php`);

				setProducts(response.data);
			} catch (error) {
				console.log('error');
			}
		};

		fetchData();
	}, []);

	const [discProducts, setDiscProducts] = useState([{}]);
	useEffect(() => {
		const fetchData = async () => {
			try {
				const response = await axios.get(
					`${url}/get_discounted_products.php`
				);
				setDiscProducts(response.data);
			} catch (error) {
				console.log('error');
			}
		};

		fetchData();
	}, []);

	const [transactions, setTransactions] = useState([{}]);

	const fetchTrans = async () => {
		try {
			const response = await axios.get(`${url}/get_transaction.php`);
			let data = response.data;

			let trans = [];
			data.map((data) => {
				if (data.user_id == curUser.id) {
					trans.push(data);
				}
			});

			setTransactions(trans);
		} catch (error) {
			console.log('error');
		}
	};

	useEffect(() => {
		fetchTrans();
		const intervalId = setInterval(fetchTrans, 50000);
		return () => clearInterval(intervalId);
	}, [transactions, setTransactions]);

	const [sales, setSales] = useState([{}]);

	const fetchSales = async () => {
		try {
			const response = await axios.get(`${url}/get_sales.php`);
			let data = response.data;

			let sales = [];
			data.map((data) => {
				if (data.user_id == curUser.id) {
					sales.push(data);
				}
			});

			setSales(sales);
		} catch (error) {
			console.log('error');
		}
	};

	useEffect(() => {
		fetchSales();
		const intervalId = setInterval(fetchSales, 50000);
		return () => clearInterval(intervalId);
	}, [sales, setSales]);

	const [lock, setLock] = useState([{}]);
	useEffect(() => {
		const fetchData = async () => {
			try {
				const response = await axios.get(`${url}/GetLock2.php`);
				setLock(response.data);
			} catch (error) {
				console.log('error');
			}
		};

		fetchData();
	}, []);
	const value = {
		url,
		products,
		discProducts,
		users,
		setCurUser,
		curUser,
		setCart,
		cart,
		setApprovalUrl,
		approvalUrl,
		transactions,
		refreshing,
		sales,
		fetchUsers,
		announcement,
		lock,
	};

	return (
		<DataContext.Provider value={value}>{children}</DataContext.Provider>
	);
};

export default DataProvider;
