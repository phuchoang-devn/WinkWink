import mongoose from 'mongoose';

const transactionController = {
    startTransaction: async (req, res, next) => {
        try {
            const session = await mongoose.startSession();
            res.locals.dbSession = session;
            session.startTransaction();
        } catch (error) {
            console.log(error)
            next(error);
        }
        next();
    },

    commitTransaction: async (req, res, next) => {
        const session = res.locals.dbSession;

        try {
            await session.commitTransaction();
            session.endSession();
        } catch(error) {
            next(error);
        }

        next();
    },

    abortTransaction: async (error, req, res, next) => {
        const session = res.locals.dbSession;

        if(session) {
            await session.abortTransaction();
            session.endSession();
        }

        next(error);
      }
}

export default transactionController