import { OnRpcRequestHandler } from '@metamask/snaps-types';
import { panel, text } from '@metamask/snaps-ui';

/**
 * Handle incoming JSON-RPC requests, sent through `wallet_invokeSnap`.
 *
 * @param args - The request handler args as object.
 * @param args.origin - The origin of the request, e.g., the website that
 * invoked the snap.
 * @param args.request - A validated JSON-RPC request object.
 * @returns The result of `snap_dialog`.
 * @throws If the request method is not valid for this snap.
 */
export const onRpcRequest: OnRpcRequestHandler = ({ origin, request }) => {
  switch (request.method) {
    case 'hello':
      return snap.request({
        method: 'snap_dialog',
        params: {
          type: 'Confirmation',
          content: panel([
            text(`Hello, **${origin}**!`),
            text("Welcome to Owen Craston's test snap"),
          ]),
        },
      });
    case 'inApp_notification':
      return snap.request({
        method: 'snap_notify',
        params: {
          type: 'inApp',
          message: 'This is a test in app notification',
        },
      });
    case 'native_notification':
      return snap.request({
        method: 'snap_notify',
        params: {
          type: 'native',
          message: 'This is a test native notification',
        },
      });
    default:
      throw new Error('Method not found.');
  }
};
