import TransactionsRepository from '../repositories/TransactionsRepository';
import Transaction from '../models/Transaction';

class CreateTransactionService {
  private transactionsRepository: TransactionsRepository;

  constructor(transactionsRepository: TransactionsRepository) {
    this.transactionsRepository = transactionsRepository;
  }

  public execute(params : Omit<Transaction, 'id'>): Transaction {

    const {title, value, type} = params;

    var transaction = this.transactionsRepository.create({title, value, type});

    return transaction;

  }
}

export default CreateTransactionService;
