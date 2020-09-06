import Transaction from '../models/Transaction';

interface Balance {
  income: number;
  outcome: number;
  total: number;
}

class TransactionsRepository {
  private transactions: Transaction[];

  constructor() {
    this.transactions = [];
  }

  public all(): Transaction[] {
    return this.transactions;
  }

  public getBalance(): Balance {
    const income = this.transactions
                  .filter(trans => trans.type == 'income')
                  .map(trans => trans.value)
                  .reduce((prev, next) => prev + next, 0);

    const outcome = this.transactions
                  .filter(trans => trans.type == 'outcome')
                  .map(trans => trans.value)
                  .reduce((prev, next) => prev + next, 0);

    return {income, outcome, total: (income - outcome)};
  }

  public create({title, value, type} : Omit<Transaction, 'id'>): Transaction {

    var transaction = new Transaction({title, value, type});

    if(transaction.type == 'outcome' && transaction.value > this.getBalance().total){
      throw new Error("This transaction could'nt be finish cause balance is not enough");
    }

    this.transactions.push(transaction);
    return transaction;

  }
}

export default TransactionsRepository;
