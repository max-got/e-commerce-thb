import type { Writable } from 'svelte/store';

export const loader = (node: HTMLElement, store: Writable<boolean>) => {
	const initial_node_style = {
		opacity: node.style.opacity,
		pointerEvents: node.style.pointerEvents,
		cursor: node.style.cursor,
		position: node.style.position
	};

	const unsubscribe = store.subscribe((loading) => {
		if (loading) {
			node.style.opacity = '0.5';
			node.style.pointerEvents = 'none';
			node.style.cursor = 'wait';
			node.style.position = 'relative';

			//add the spin animation
			const style = document.createElement('style');
			style.innerHTML = `
                @keyframes spin {
                    0% {
                        transform: rotate(0deg);
                    }
                    100% {
                        transform: rotate(360deg);
                    }
                }
            `;

			//overlay a loading spinner with inline style
			const spinner = document.createElement('div');
			spinner.id = 'spinner';
			spinner.style.position = 'absolute';
			spinner.style.top = '50%';
			spinner.style.left = '50%';
			spinner.style.transform = 'translate(-50%, -50%)';
			spinner.style.width = '40px';
			spinner.style.height = '40px';
			spinner.style.borderRadius = '50%';
			spinner.style.border = '3px solid transparent';
			spinner.style.borderTopColor = 'black';
			spinner.style.animation = 'spin 1s linear infinite';
			spinner.style.zIndex = '1000';

			node.appendChild(style);
			node.appendChild(spinner);
		} else {
			node.style.opacity = initial_node_style.opacity;
			node.style.pointerEvents = initial_node_style.pointerEvents;
			node.style.cursor = initial_node_style.cursor;

			//remove the spinner
			const spinner = node.querySelector('#spinner');
			if (spinner) {
				node.removeChild(spinner);
			}
		}
	});

	return {
		destroy() {
			unsubscribe();
		}
	};
};
